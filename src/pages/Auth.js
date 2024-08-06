import SignUp from "../components/SignUp";

function Auth() {
    return <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }}>
        <SignUp />
    </div>;
}

export default Auth;