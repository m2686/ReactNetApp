/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { GetUsers, UserData } from './User';

export const Graphic = () =>
{
    return (
        <div>
            <div id="rolling_retention"
                css={css`
                    display: flex;
                    justify-content: center;
                    margin: 10px 10px 10px 10px;
                `}
            >
            </div>
            <div
                css={css`
                    display: flex;
                    justify-content: center;
                    margin: 10px 10px 10px 10px;
                `}
            >
                <canvas id="idGraphic"></canvas>
            </div>
        </div>
    );
}

function Line(ctx: CanvasRenderingContext2D | null, startX: number, startY: number, endX: number, endY: number, color: string)
{
    if (ctx === null) return;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function Bar(ctx: CanvasRenderingContext2D | null, x: number, y: number, width: number, height: number, color: string)
{
    if (ctx === null) return;
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
}

function Days(dt1: Date, dt2: Date): number
{
    let beg = new Date(dt1);
    let end = new Date(dt2);
    let days = Math.ceil(Math.abs(end.getTime() - beg.getTime()) / (1000 * 3600 * 24));
    return days;
}

export function DrawGraphic()
{
    let canv = document.getElementById("idGraphic") as HTMLCanvasElement;
    let users: UserData[] = GetUsers();
    if (canv !== null)
    {
        canv.width = 600;
        canv.height = 400;
        let ct = canv.getContext("2d");
        Line(ct, 1, 1, 1, 399, "#000000");
        Line(ct, 1, 1, 599, 1, "#000000");
        Line(ct, 599, 1, 599, 399, "#000000");
        Line(ct, 1, 399, 599, 399, "#000000");

        let upper = 350;
        let hmax = 0.0;
        users.forEach(u =>
        {
            let days = Days(u.regdate, u.actdate);
            if (days > hmax) hmax = days;
        });
        let x = 50;
        let cols: string[] = [ "#00aa60", "#aaaa60", "#bb0060", "#cc10dd", "#10bbdd" ];
        let i = 0;
        users.forEach(u =>
        {
            let height = (Days(u.regdate, u.actdate) / hmax) * upper;
            Bar(ct, x, 400 - height - 2, 100, height, (i < 5) ? cols[i] : "#00aa60");
            x += 100;
            i++;
        });
    }
    let rr = document.getElementById("rolling_retention") as HTMLDivElement;
    if (rr !== null)
    {
        let nret = 0.0;
        let napp = 0.0;
        users.forEach(u =>
        {
            let days = Days(u.actdate, u.regdate);
            if (days >= 7) nret++;
            days = Days(new Date(), u.regdate);
            if (days <= 7) napp++;
        });
        rr.innerHTML = "Rolling Retention 7 day = " + ((napp !== 0) ? (nret / napp) : "unknown");
    }
}