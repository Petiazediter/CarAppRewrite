export function addParameterToURL(parameter: string, value: string, isEmpty: boolean): void{
    // We need to check if the parameter is already in the URL.
    let newURL = window.location.search;
    const isExists = checkExistenceOfParameterInURL(parameter);
    if ( isExists ){
        // We need to remove the parameter from the URL.
        newURL = removeParameterFromURL(parameter);
    }

    // We need to check if we just want to clear the parameter or not.
    if ( !isEmpty ) {
        if ( newURL.includes('?')){
            newURL = `${newURL}&${parameter}=${value}`
        } else {
            newURL = `${newURL}?${parameter}=${value}`
        }
    }
    window.history.pushState('', 'CarBidApp', `/${newURL}`);
}

function checkExistenceOfParameterInURL(parameter: string): boolean{
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get(parameter) !== null;
}

function removeParameterFromURL(key: string): string {
    const link = window.location.search;
    let returnURL = link.split("?")[0],
        parameter,
        parameters = [],
        queryString = (link.indexOf("?") !== -1) ? link.split("?")[1] : "";

    if ( queryString !== ""){
        parameters = queryString.split("&");
        for ( let i = parameters.length - 1; i >= 0; i -= 1 ){
            parameter = parameters[i].split("=")[0];
            if ( parameter === key){
                parameters.splice(i, 1);
            }
        }
        if ( parameters.length) returnURL = returnURL + "?" + parameters.join("&");
    }
    return returnURL;
}
