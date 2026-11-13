import Address from "@/models/addressModel";
import { AddressFormData } from "@/types/address";
import { mongoDBConnect } from "@/lib/mongoDb";

export const CreateAddress=async(userID:string,address:AddressFormData)=>{
     
      try{
        await mongoDBConnect();
        const deliveryAddress=await Address.create({...address,userId:userID});
        return{
         success:true as const,
         address:deliveryAddress    
        }
      }
      catch(error){
         console.error("PaymentAction error:", error);

    return {
      success: false as const,
      message: "Unable to save delivery address.",
    };
      }
}
