import * as Patient from './patient';
import * as Doctor from './doctor';

export async function init(): Promise<void> {
  await Patient.test();
  await Doctor.test();
}
