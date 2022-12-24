const OWNER_ID          = "" // Add your freshrelease user ID
const API_KEY           = "" // Add your freshrelease personal token
const FRESHRELEASE_URL  = "" // Add freshrelease URL for your organization
const TITLE             = "Work todos" // Modify this as you please

export const className = `
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital@1&display=swap');

    left: 0px;
    top: 0px;
    color: #fff;
    opacity: 0.7;
    font-size: 0.9em;
    border: none;

    fieldset {
        padding: 20px;
        border: 0px;
        border-radius: 10px;
        font-family: system-ui
      }

    h1 {
        font-size: 3.5em !important
        background-color: rgba(0,0,0,.2);
    }
    td {
        background-color: rgba(0,0,0,.4);
        border-radius: 15px;
        padding: 5px;
    }
        
    a {
        color: #fff
    }



`


export const refreshFrequency = 3600*1000;

// could have used fetch, but the platform automatically adds Useragent and other info, due to which server refuses to return proper response. cURL is way simpler.
export const command =`curl -sS 'https://`+FRESHRELEASE_URL+`/issues?owner_id=`+OWNER_ID+`&sort_type=desc' --header 'authorization: Token `+API_KEY+`' --header 'content-type: application/json'`;

export const render =  command => {
    
    const data = command?.output && JSON.parse(command.output);
    let tickets = []
    
    data["issues"].forEach(element => {
        // assumes ticket-ID = [project-ID]-[ticket-number]
        let ticket_url = "https://"+FRESHRELEASE_URL+"/ws/"+element["key"].split("-")[0]+"/tasks/"+element["key"]
        tickets.push(<tr><td>{element["title"]}</td> <td><a href={ticket_url}>{element["key"]}</a></td></tr>)
    });
    
    return (
        <fieldset>
            <h1>Work todos</h1>
            <table>
                {tickets}
            </table>
            
        </fieldset>
    );      
};