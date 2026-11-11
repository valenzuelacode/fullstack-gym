import * as z from 'zod';
export const CreateUserValidator = z.object({

        email:z.email({error:'El email debe tener un formato example@example.com'})
                .min(5,{error:'El email debe contener 5 caracteres mínimo'}),
        password:z.string()
                .min(6,{error:'El password debe tener mínimo 6 caracteres'}),
        firstName:z.string()
                .min(2,{error:'El nombre debe tener al menos 2 caracteres'}),
        lastName:z.string()
                .min(2,{error:'El nombre debe tener al menos 2 caracteres'}),
        address: z.string()
                .min(6,{error:"La dirección no puede tener menos de 6 caracteres"}),
        phoneNumber: z.string()
                .min(9,{error: "El número de teléfono debe tener 9 caracteres"})
})

export const CreateUserProfileValidator = z.object({
        role:z.string(),
        plan:z.string()
})