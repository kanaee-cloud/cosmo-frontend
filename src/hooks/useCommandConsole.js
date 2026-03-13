import * as Yup from 'yup';
import { useAddDirective } from './useDirectives';

export const useCommandConsole = (onClose) => {
  const { mutate: addDirective, isPending: isAdding } = useAddDirective();

  const formikConfig = {
    initialValues: { 
      title: '', 
      mission_log: '', 
      category: 'GENERAL', 
      imageFile: null 
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().min(3, 'TOO SHORT').max(50, 'TOO LONG').required('REQUIRED'),
      mission_log: Yup.string().min(5, 'LOG TOO SHORT').required('REQUIRED'),
      category: Yup.string().required('REQUIRED'),
    }),
    onSubmit: (values, { resetForm }) => {
      addDirective(values, {
        onSuccess: () => {
          resetForm();
          if (onClose) onClose(); // Tutup modal setelah sukses tersimpan
        },
      });
    }
  };

  return {
    formikConfig,
    isAdding
  };
};