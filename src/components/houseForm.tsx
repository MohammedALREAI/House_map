import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { Image } from "cloudinary-react";
import { SearchBox } from "./searchBox";
import {
  CreateHouseMutation,
  CreateHouseMutationVariables,
} from "src/generated/CreateHouseMutation";
import {
  UpdateHouseMutation,
  UpdateHouseMutationVariables,
} from "src/generated/UpdateHouseMutation";
import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";



interface IFormData{
  address:string,
  latitude:number,
  longitude:number,
  bedromms:string
  image:FileList;

}


interface Props {
  
}

export default function houseForm({}: Props) {
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>();

  const {register,handleSubmit,setValue,setError,errors,watch }=useForm<IFormData>({defaultValues:{
    address:'',
    latitude: 37.7577,
    longitude: -122.4376,
    bedromms:''
    image:'';
  }})

  useEffect(() => {
  register({name:'address'},{required:"the address is required"})
  register({name:'latitude'},{required:true ,min:-90, max:90})
  register({name:'longitude'},{required:true ,min:-180, max:180})
  }, [register])

const handleCreate=async(data:IFormData)=>{

}
  const onSubmit=(data:IFormData)=>{
    setIsSubmit(true);
    handleCreate(data)

  }
  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl"> Add New Houses</h1>
      <div className="mt-4">
        <label htmlFor="search" className="block"> search for your  address</label>
        <SearchBox onSelectAddress={ (address,latitude,longitude)=>{
          setValue('address',address)
          setValue('latitude',latitude)
          setValue('longitude',longitude)
        } }
      
          defaultValue=''
      />
        {errors.address&&<p>{errors.address.message}</p>}
        <div className="mt-4">
          <label htmlFor="image" className="p-4 border-dashed border-4 block cursor-pointer">
            click add image (16:9)
          </label>
          <input id='image' className="hidden"
          onChange={(e:ChangeEvent<HTMLInputElement>)=>{

            const target=e.target  as HTMLInputElement
            const file: File = (target.files as FileList)[0];

            if(file){
                const reader=new FileReader();
                reader.onloadend=()=>{
                  setPreviewImage(reader.result as string)
                };
                reader.readAsDataURL(file)
            }
          }}

          // ref={register({
          //   validate:(fileList:FileList)=>{
          //      return fileList.length====1 ? true:'please update  one file'}})}
            
       
          type='file' accept="image/*"/>
          {errors.image &&<p>{errors.image.message}</p> }
        </div>

      </div>
     
     
    </form>
  );
}
