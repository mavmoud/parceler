export const handleClickPage = (navigate : Function, url: string,  setState : Function, bool : boolean) => {
    setState(bool);
    navigate(url);
}