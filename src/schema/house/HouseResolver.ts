import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
} from "type-graphql";
import { getBoundsOfDistance } from "geolib";
import { Context, AuthorizedContext } from "../context";
import{House} from'./House'
import { HouseInput} from "./dto/HouseInput.dto";
import { BoundsInput} from "./dto/BoundsInput.dto";



@Resolver(House)
export class HouseResolver {
  @Query((_returns) => House, { nullable: true })
  async house(@Arg("id") id: string, @Ctx() ctx: Context) {
    return ctx.prisma.house.findUnique({ where: { id: parseInt(id, 10) } });
  }

  @Query((_returns) => [House], { nullable: false })
  async houses(@Arg("bounds") bounds: BoundsInput, @Ctx() ctx: Context) {
    return ctx.prisma.house.findMany({
      where: {
        latitude: { gte: bounds.sw.latitude, lte: bounds.ne.latitude },
        longitude: { gte: bounds.sw.longitude, lte: bounds.ne.longitude },
      },
      take: 50,
    });
  }

  @Authorized()
  @Mutation((_returns) => House, { nullable: true })
  async createHouse(
    @Arg("input") input: HouseInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    return await ctx.prisma.house.create({
      data: {
        userId: ctx.uid,
        image: input.image,
        address: input.address,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        bedrooms: input.bedrooms,
      },
    });
  }

  @Authorized()
  @Mutation((_returns) => House, { nullable: true })
  async updateHouse(
    @Arg("id") id: string,
    @Arg("input") input: HouseInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    const houseId = parseInt(id, 10);
    const house = await ctx.prisma.house.findUnique({ where: { id: houseId } });

    if (!house || house.userId !== ctx.uid) return null;

    return await ctx.prisma.house.update({
      where: { id: houseId },
      data: {
        image: input.image,
        address: input.address,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        bedrooms: input.bedrooms,
      },
    });
  }

  @Authorized()
  @Mutation((_returns) => Boolean, { nullable: false })
  async deleteHouse(
    @Arg("id") id: string,
    @Ctx() ctx: AuthorizedContext
  ): Promise<boolean> {
    const houseId = parseInt(id, 10);
    const house = await ctx.prisma.house.findUnique({ where: { id: houseId } });

    if (!house || house.userId !== ctx.uid) return false;

    await ctx.prisma.house.delete({
      where: { id: houseId },
    });
    return true;
  }
}
