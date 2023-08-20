import React from 'react'
import '../App.css'
import { BiUser } from 'react-icons/bi'
import { AiOutlineLock } from 'react-icons/ai'
import { VscLoading } from "react-icons/vsc";
import supabase from '../Supabase'
import Swal from 'sweetalert2';

const handleSignup = async (email, password) => {
    try {
        const { data: Users, error: userdberror } = await supabase
            .from("Users")
            .select("*")
            .eq("email", email);

        if (userdberror) {
            Swal.fire({
                title:'Invalid credentials',
                icon:'error'
            })
        } else if (Users.length > 0) {
            Swal.fire({
                title:'Error',
                text:'User already exists',
                icon:'error'
            })

            return 2;
        } else {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {

            }

            if (data.user) {
                const { data, error } = await supabase
                    .from("Users")
                    .insert([{ email: email }]);
                if (error) {
                    Swal.fire({
                        title:'Invalid credentials',
                        icon:'error'
                    })
                }
                Swal.fire({
                    title:'Sign up successfull',
                    text:'Confirm your email to proceed',
                    icon:'success'
                }).then(function(){
                    window.location.replace('/login')
                })

            } else {
                Swal.fire({
                    title:'Invalid credentials',
                    icon:'error'
                })
            }
        }
    } catch (error) {
        Swal.fire({
            title:'Invalid credentials',
            icon:'error'
        })
    }
    return 0;
};

function SignUp() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function SignUptoDB() {
        if (email == '' || password == '') {
            Swal.fire({
                title:'Error',
                text:'Please fill all the fields',
                icon:'error'
            })
            return;
        }
        else if (password.length < 6) {
            Swal.fire({
                title:'Error',
                text:'Password should be greater then 6 characters',
                icon:'error'
            })
        }
        else {
            await handleSignup(email, password);
        }
    }

    const EmailInputChange = (event) => {
        setEmail(event.target.value);
    };

    const passwordInputChange = (event) => {
        setPassword(event.target.value);
    };

    function RedirectLogin() {
        // console.log(email);
        // console.log(password);
        window.location.replace('/login')
    }

    return (
        <div class='backMain2'>
            <div class='w-full h-full flex justify-center items-center'>
                <div class='lg:w-[50%] md:w-[70%] w-4/5 h-2/3 bg-white/10 rounded-3xl items-center flex flex-col py-8 md:px-16 px-8 justify-between'>
                    <text class='text-4xl text-white font-thin text-center'>USER SIGNUP</text>
                    <div class='w-full h-[50%] flex flex-col justify-evenly'>
                        <div class='w-full h-[27%] flex items-center rounded-md border-[3px] border-[#30A2FF]'>
                            <div class='h-full w-[10%] hidden md:flex justify-center items-center rounded-s-md border-r-[3px] border-[#30A2FF] bg-white'>
                                <BiUser size='2rem' />
                            </div>
                            <input class='md:w-[90%] w-full h-full md:rounded-e-md md:rounded-s-none rounded-md outline-none px-3 text-lg' placeHolder='Enter your email' onChange={EmailInputChange}></input>
                        </div>
                        <div class='w-full h-[27%] flex items-center rounded-md border-[3px] border-[#30A2FF]'>
                            <div class='h-full w-[10%] hidden md:flex justify-center items-center rounded-s-md border-r-[3px] border-[#30A2FF] bg-white'>
                                <AiOutlineLock size='2rem' />
                            </div>
                            <input class='md:w-[90%] w-full h-full md:rounded-e-md md:rounded-s-none rounded-md outline-none px-3 text-lg' placeHolder='Enter your password' type='password' onChange={passwordInputChange}></input>
                        </div>
                    </div>
                    <div class='w-full h-[30%] flex flex-col justify-between'>
                        <div class='w-full h-[45%] text-white'>
                            <button class='btn4' onClick={SignUptoDB}>Sign up</button>
                            {/* <VscLoading className="animate-spin inline-block ml-2 w-full" /> */}

                        </div>
                        <div class='w-full h-[45%] text-white'>
                            <button class='btn3' onClick={RedirectLogin}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp