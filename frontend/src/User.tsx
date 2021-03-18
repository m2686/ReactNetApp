import React, { FC } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { font_family, font_size } from './Styles';

export interface UserData
{
    userid: number;
    regdate: Date;
    actdate: Date;
}

interface Props
{
    data: UserData;
}

export const UserRow: FC<Props> = ({data}) =>
{
    return (
        <tr>
            <td>
                { data.userid }
            </td>
            <td>
                <input type="text" id={"regdatainput" + data.userid}
                    css={css`
                        font-family: ${ font_family };
                        font-size: ${ font_size };
                        border: none;
                    `}
                >
                </input>
            </td>
            <td>
                <input type="text" id={"actdatainput" + data.userid}
                    css={css`
                        font-family: ${ font_family };
                        font-size: ${ font_size };
                        border: none;
                    `}
                >
                </input>
            </td>
        </tr>
    )
}

export let Users: UserData[] =
[
    {
        userid: 1,
        regdate: new Date(),
        actdate: new Date()
    },
    {
        userid: 2,
        regdate: new Date(),
        actdate: new Date()
    },
    {
        userid: 3,
        regdate: new Date(),
        actdate: new Date()
    },
    {
        userid: 4,
        regdate: new Date(),
        actdate: new Date()
    },
    {
        userid: 5,
        regdate: new Date(),
        actdate: new Date()
    },
]

export function GetUsers()
{
    return Users;
}

export function SetUsers(users: UserData[])
{
    Users = users;
}