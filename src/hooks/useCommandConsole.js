import * as Yup from 'yup';
import { useAddDirective } from './useDirectives';
import { useFormik } from 'formik';

export const useCommandConsole = (onClose, initialTitle = '') => {
  const { mutate: addDirective, isPending: isAdding } = useAddDirective();

  const formikConfig = useFormik({
    initialValues: { 
      title: initialTitle, 
      mission_log: '',
      priority: 'ELEVATED', // Default priority
      category: 'GENERAL' 
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string().min(3, 'TOO SHORT').max(50, 'TOO LONG').required('REQUIRED'),
      mission_log: Yup.string().min(5, 'LOG TOO SHORT').notRequired(), // Optional
      category: Yup.string().required('REQUIRED'),
      priority: Yup.string().required('REQUIRED'),
    }),
    onSubmit: (values, { resetForm }) => {
      // Clean up values before sending if needed
      const payload = {
        ...values,
        mission_log: values.mission_log || '', // Ensure string
      };
      
      addDirective(payload, {
        onSuccess: () => {
          resetForm();
          if (onClose) onClose();
        },
      });
    }
  });

  return {
    formikConfig,
    isAdding
  };
};