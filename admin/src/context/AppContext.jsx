import { createContext } from "react"


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = "DH";

    const months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aut", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return '';
        const dateArray = slotDate.split('_');
        return dateArray[0] + ' ' + months[Number(dateArray[1]) - 1] + ' ' + dateArray[2];
    };

    const calculateAge = (dob) => {
        if (!dob) return '--';
        const today = new Date();
        const birthDate = new Date(dob);
        if (isNaN(birthDate)) {
            return '--';
        }
        let age = today.getFullYear() - birthDate.getFullYear();

        return age;
    }

    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider