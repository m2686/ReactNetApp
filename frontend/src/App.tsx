/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { HomePage } from './HomePage';
import { font_family, font_size } from './Styles';
import { GetUsers, SetUsers, UserData } from './User';

let started = false;
let loaded = false;

function DateToStr(date: Date)
{
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let res = ((d < 10) ? "0" : "") + d + "." + ((m < 10) ? "0" : "") + m + "." + y;
    return res;
}

async function GetResponse()
{
    let users: UserData[] = [];
    await fetch('https://a3033-e974b.s2.deploy-f.com/api/users').then(response =>
    {
        if (response.ok) response.json().then(data =>
        {
            users = data;
            if (users.length === 5) SetUsers(users);
            loaded = true;
        })
    });
}

function FillUsers()
{
    let users = GetUsers();
    users.forEach(u =>
    {
        let reginp = document.getElementById("regdatainput" + u.userid) as HTMLInputElement;
        let actinp = document.getElementById("actdatainput" + u.userid) as HTMLInputElement;
        if (reginp !== null) reginp.value = DateToStr(new Date(u.regdate));
        if (actinp !== null) actinp.value = DateToStr(new Date(u.actdate)); 
    });
}

function App()
{
    if (!started)
    {
        started = true;
        GetResponse();
    }

    setInterval(() => { if (loaded) { FillUsers(); loaded = false; }}, 100);

    return (
        <div className="App"
            css = {css`
                font-family: ${ font_family };
                font-size: ${ font_size };
                color: #000000;
            `}
        >
            <HomePage data={GetUsers()} />
        </div>
    );
}

export default App;
