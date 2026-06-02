import { z } from "zod"

export const bookingFormSchema = z.object({
  serviceId: z.string().min(1, "Wybierz usługę."),
  date: z
    .string()
    .min(1, "Wybierz datę.")
    .refine((d) => {
      const today = new Date().toLocaleDateString("sv-SE", {
        timeZone: "Europe/Warsaw",
      })
      return d >= today
    }, "Nie można rezerwować terminu w przeszłości."),
  time: z.string().min(1, "Wybierz godzinę."),
  notes: z.string().max(500, "Maksymalnie 500 znaków.").optional(),
  inspirationUrl: z.string().optional(),
})

export type BookingFormValues = z.infer<typeof bookingFormSchema>
