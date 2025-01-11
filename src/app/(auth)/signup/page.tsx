import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SignupForm from './_components/signup-form';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Please enter your credentials to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <p>
          Need help?{' '}
          <Link
            href='/forgot-password'
            className='text-primary hover:underline transition-all'
          >
            Forgot Password
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupPage;
