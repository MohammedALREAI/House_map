import { InputType, Field } from "type-graphql";
import { CoordinatesInput } from "./CoordinatesInput.dto";

@InputType()
export class BoundsInput {
  @Field((_type) => CoordinatesInput)
  sw!: CoordinatesInput;

  @Field((_type) => CoordinatesInput)
  ne!: CoordinatesInput;
}