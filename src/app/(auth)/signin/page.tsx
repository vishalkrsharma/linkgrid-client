import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SigninForm from './_components/signin-form';
import Link from 'next/link';

const SigninPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Please enter your credentials to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm />
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

export default SigninPage;
