const specialCharacters = "?!";

const valid = {
    password: (value)=>{
        if(value.length < 6) return false;

        let hasSpecialCharacteres = false;
        let hasNumber = false;

        const arrValue = value.split('');

        for(let i = 0; i < arrValue.length && !(hasSpecialCharacteres && hasNumber); i++){
            if(typeof Number(arrValue[i]) !== 'NaN') hasNumber = true;
            if(specialCharacters.split('').includes(arrValue[i])) hasSpecialCharacteres = true;
        }

        return hasSpecialCharacteres && hasNumber;
    },
    username: (value)=>{
        return !["cloud", "lx2018", "kiwi"].includes(value);
    },
    email: (email)=>{
        let user = email.substring(0, email.indexOf("@"));
        
        let domain = email.substring(email.indexOf("@")+ 1, email.length);

        return ((user.length >=1) &&
            (domain.length >=3) &&
            (user.search("@")==-1) &&
            (domain.search("@")==-1) &&
            (user.search(" ")==-1) &&
            (domain.search(" ")==-1) &&
            (domain.search(".")!=-1) &&
            (domain.indexOf(".") >=1)&&
            (domain.lastIndexOf(".") < domain.length - 1));
    }
}

export default valid;