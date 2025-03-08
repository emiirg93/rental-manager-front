import { RentalValues } from './rental-values.model';

export interface EmitterUploadFile {
  rentalValues?: RentalValues;
  formData?: FormData;
  stepIndex?: number;
}
