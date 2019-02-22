import * as Patient from './patient';
import * as Doctor from './doctor';
import * as InternalNurse from './internal-nurse';

export async function init(): Promise<void> {
  // await Patient.test();
  await InternalNurse.test();
  // await Doctor.test();
}
