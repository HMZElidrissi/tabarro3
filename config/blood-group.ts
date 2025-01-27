import { BloodGroup } from '@/types/enums';

export const bloodGroups = [
    { value: BloodGroup.A_POSITIVE, label: 'A+' },
    { value: BloodGroup.A_NEGATIVE, label: 'A-' },
    { value: BloodGroup.B_POSITIVE, label: 'B+' },
    { value: BloodGroup.B_NEGATIVE, label: 'B-' },
    { value: BloodGroup.O_POSITIVE, label: 'O+' },
    { value: BloodGroup.O_NEGATIVE, label: 'O-' },
    { value: BloodGroup.AB_POSITIVE, label: 'AB+' },
    { value: BloodGroup.AB_NEGATIVE, label: 'AB-' },
    { value: BloodGroup.UNKNOWN, label: 'Unknown' },
];

export const getBloodGroupLabel = (bloodGroup: BloodGroup | null) => {
    return bloodGroups.find(bg => bg.value === bloodGroup)?.label || 'Unknown';
};
