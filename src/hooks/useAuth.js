import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useAuthStore } from '../store/authStore';


export const useLoginLogic = () => {
  const { signIn, signInWithGoogle } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      await signIn(email, password); 
    },
    // Don't navigate here - let the component handle it with the modal
  });


  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('INVALID FREQUENCY FORMAT').required('FREQUENCY REQUIRED'),
    password: Yup.string().required('ACCESS CODE REQUIRED'),
  });


  const onSubmit = (values) => {
    loginMutation.mutate(values);
  };

  return {
    loginMutation,
    initialValues,
    validationSchema,
    onSubmit,
    signInWithGoogle
  };
};


export const useRegisterLogic = () => {
  const { signUp } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: async ({ email, password, callsign }) => {
      await signUp(email, password, callsign);
    },
    // Don't navigate here - let the component handle it with the modal
  });

  const initialValues = { callsign: '', email: '', password: '', confirmPassword: '' };

  const validationSchema = Yup.object().shape({
    callsign: Yup.string().min(3, 'TOO SHORT').max(20, 'TOO LONG').required('REQUIRED'),
    email: Yup.string().email('INVALID FREQUENCY').required('REQUIRED'),
    password: Yup.string().min(6, 'ENCRYPTION TOO WEAK (MIN 6)').required('REQUIRED'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'CODES DO NOT MATCH')
      .required('REQUIRED'),
  });

  const onSubmit = (values) => {
    registerMutation.mutate(values);
  };

  return {
    registerMutation,
    initialValues,
    validationSchema,
    onSubmit
  };
};