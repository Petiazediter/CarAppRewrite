import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";
import { useEffect, useState } from "react";

export const validateUsername = () => ({
    validator(_: RuleObject, value: StoreValue) {
        if ( !value || value.length > 5 ) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('The username is too short!'))
    }
})

interface User{
    id: string;
    username: string;
}

export const useUserData = () => {
    const [user,setUser] = useState<User|null>(null)

    useEffect( () => {
        if ( user != null ){
            console.log(user.username)
        }
    }, [user])

    return user
}