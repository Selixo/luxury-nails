import { z } from "zod"

export const phoneSchema = z
  .string({ invalid_type_error: "Nieprawidłowy numer telefonu." })
  .regex(/^\d{9}$/, "Podaj poprawny 9-cyfrowy numer telefonu.")
  .transform((val) => `+48${val}`)

export const loginPasswordSchema = z
  .string({ invalid_type_error: "Nieprawidłowe hasło." })
  .min(1, "Wpisz hasło.")
  .max(72, "Hasło może mieć maksymalnie 72 znaki.")

export const registerPasswordSchema = z
  .string({ invalid_type_error: "Nieprawidłowe hasło." })
  .min(8, "Hasło musi mieć co najmniej 8 znaków.")
  .max(72, "Hasło może mieć maksymalnie 72 znaki.")

export const nameSchema = z
  .string({ invalid_type_error: "Nieprawidłowe imię." })
  .trim()
  .min(1, "Wpisz swoje imię.")
  .max(100, "Imię jest zbyt długie.")

export const lastNameSchema = z
  .string({ invalid_type_error: "Nieprawidłowe nazwisko." })
  .trim()
  .min(1, "Wpisz swoje nazwisko.")
  .max(100, "Nazwisko jest zbyt długie.")

export const registerSchema = z
  .object({
    name: nameSchema,
    lastName: lastNameSchema,
    password: registerPasswordSchema,
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Hasła nie są identyczne.",
    path: ["confirm"],
  })
