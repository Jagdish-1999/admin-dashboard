import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/products/_components/Input";
import { FcGoogle } from "react-icons/fc";
import { ProductImagesTypes } from "@/types";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { loginUser, registerUser } from "@/slices/user.slice";
import { RegisterUserPayload } from "@/types/user.slice.types";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner8 } from "react-icons/im";

const LOGIN = "Login";
const REGISTER = "Register";
const loginText = "Already have an account?";
const registerText = "Don't have an account?";

export const USERNAME = "username";
export const EMAIL = "email";
export const PASSWORD = "password";

export interface FormValuesTypes {
  [USERNAME]: { value: string; error: boolean };
  [EMAIL]: { value: string; error: boolean };
  [PASSWORD]: { value: string; error: boolean };
}

export const emptyFormValues: FormValuesTypes = {
  [USERNAME]: { value: "", error: true },
  [EMAIL]: { value: "", error: true },
  [PASSWORD]: { value: "", error: true },
};

interface RegiserPropTypes {
  onBackDropClick: React.MouseEventHandler<HTMLDivElement>;
}

const Register = ({ onBackDropClick }: RegiserPropTypes) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.userDetails);
  const [backDropAnimate, setBackDropAnimate] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [avatarLogo, setAvatarLogo] = useState<ProductImagesTypes[]>([]);
  const [formValues, setFormValues] =
    useState<FormValuesTypes>(emptyFormValues);

  const isErrorVisible = useMemo(() => {
    if (
      isLoginPage &&
      (formValues[EMAIL].error ||
        formValues[PASSWORD].error ||
        !formValues[EMAIL].value ||
        !formValues[PASSWORD].value)
    ) {
      return true;
    } else if (
      !isLoginPage &&
      (formValues[USERNAME].error ||
        formValues[EMAIL].error ||
        formValues[PASSWORD].error ||
        !formValues[USERNAME].value ||
        !formValues[EMAIL].value ||
        !formValues[PASSWORD].value ||
        !avatarLogo.length)
    ) {
      return true;
    }
  }, [avatarLogo.length, formValues, isLoginPage]);

  const handleReginserUser = useCallback(async () => {
    const payload: RegisterUserPayload = {
      name: formValues[USERNAME].value,
      email: formValues[EMAIL].value,
      password: formValues[PASSWORD].value,
      avatar: avatarLogo[0]?.file,
    };
    dispatch(registerUser(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsLoginPage(true);
      }
      return true;
    });
  }, [avatarLogo, dispatch, formValues]);

  const handleLoginUser = useCallback(async () => {
    const { email, password } = formValues;
    dispatch(loginUser({ email: email.value, password: password.value })).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          router.push("/");
        }
        return true;
      }
    );
  }, [dispatch, formValues, router]);

  const handleInput = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev: FormValuesTypes) => ({
        ...prev,
        [evt.target.name]: {
          value: evt.target.value,
          error: !evt.target.value,
        },
      }));
    },
    []
  );

  const handleAvatarUpload = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (evt.target.files?.[0]) {
        const file = evt.target.files[0];
        setAvatarLogo([
          {
            file,
            url: URL.createObjectURL(file),
          },
        ]);
      }
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (isLoginPage) {
      handleLoginUser();
    } else {
      handleReginserUser();
    }
  }, [handleLoginUser, handleReginserUser, isLoginPage]);

  return (
    <div
      className={cn(
        "flex pointer-events-none group/form-container items-center animate-form-in repeat-1 justify-center w-screen h-screen fixed -top-0 left-0 bg-neutral-500/80 backdrop-blur-md overflow-hidden z-[99999]",
        backDropAnimate && "animate-form-out repeat-1"
      )}
    >
      <form
        className={cn(
          "relative z-10 pointer-events-auto animate-form-in animation-delay-50 repeat-1 bg-neutral-100 flex gap-2 w-full h-fit border border-neutral-600/20 max-w-lg p-6 rounded-md backdrop-blur-md cursor-default transition-all duration-150",
          backDropAnimate && "animate-form-out animation-delay-75 repeat-1",
          isLoading &&
            "pointer-events-none select-none opacity-85 cursor-not-allowed"
        )}
        onSubmit={(evt) => {
          evt.preventDefault();
          if (isErrorVisible) return;
          handleSubmit();
        }}
      >
        <div
          className="absolute cursor-pointer -right-4 -top-4 z-[2] opacity-0 group-hover/form-container:opacity-100 transition-all duration-300 bg-red-500/40 backdrop-blur-md  rounded-full"
          onClick={() => {
            setBackDropAnimate(true);
            setTimeout((evt) => {
              onBackDropClick(evt);
              router.push("/");
            }, 230);
          }}
        >
          <RxCross2 className="w-8 h-8 font-semibold text-red-800 p-1" />
        </div>
        <div className="flex flex-col w-full gap-6">
          <h1 className="text-center text-lg">
            {isLoginPage ? LOGIN : REGISTER}
          </h1>
          {!isLoginPage && (
            <div className="">
              <Input
                required
                type="text"
                id={USERNAME}
                label="User name"
                name={USERNAME}
                placeholder="User name"
                value={formValues[USERNAME].value}
                error={formValues[USERNAME].error}
                onChange={handleInput}
              />
            </div>
          )}
          <div className="">
            <Input
              required
              id={EMAIL}
              type={EMAIL}
              label="Email"
              name={EMAIL}
              placeholder="Email"
              value={formValues[EMAIL].value}
              error={formValues[EMAIL].error}
              onChange={handleInput}
            />
          </div>
          <div className="">
            <Input
              required
              id={PASSWORD}
              label="Password"
              type={PASSWORD}
              name={PASSWORD}
              placeholder="Password"
              value={formValues[PASSWORD].value}
              error={formValues[PASSWORD].error}
              onChange={handleInput}
            />
          </div>
          {!isLoginPage && (
            <Input
              required
              id="avatar"
              type="file"
              label="Upload Avatar"
              placeholder=""
              name="avatar"
              value={""}
              productImages={avatarLogo}
              setProductImages={setAvatarLogo}
              onChange={handleAvatarUpload}
            />
          )}
          <button
            className={cn(
              "p-2 flex items-center justify-center gap-2 border border-blue-900/20 bg-blue-900/10 rounded-sm hover:bg-blue-900/15 hover:border-blue-900/25 transition-all duration-150 text-sm backdrop-blur-md",
              isErrorVisible &&
                "cursor-not-allowed border border-slate-500/10 hover:border-slate-500/10 bg-neutral-500/10 hover:bg-neutral-500/10 text-neutral-500/80"
            )}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <ImSpinner8
                className={cn(
                  "w-5 h-5",
                  isLoading && "animate-spin repeat-infinite"
                )}
              />
            ) : (
              <>{isLoginPage ? LOGIN : REGISTER}</>
            )}
          </button>
          <button className="p-2 border-blue-900/20 bg-blue-900/10 hover:bg-blue-900/15 hover:border-blue-900/25 border rounded-sm flex gap-2 items-center justify-center text-sm transition-all duration-150 backdrop-blur-md">
            <FcGoogle className="w-5 h-5" />
            Signin With Google
          </button>
          <div className="flex gap-2 text-sm">
            <h4 className="text-neutral-900/70">
              {isLoginPage ? registerText : loginText}
            </h4>
            <h4
              className="cursor-pointer text-blue-700/100 hover:underline transition-all duration-200"
              onClick={() => setIsLoginPage((prev) => !prev)}
            >
              {isLoginPage ? REGISTER : LOGIN}
            </h4>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
