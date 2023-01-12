import { getImageEndpoint } from "../../scripts/api/api";

export function updateCanvas(episode: Episode, video: HTMLVideoElement | null, timelineCanvas: HTMLCanvasElement | null, time: number): void {
    if(video === null || timelineCanvas === null) {
        return;
    }
    const sheetValue = Math.floor(time / (6*6*5)) * (6*6*5);
    const sheet = new Image();
    sheet.onload = () => {
        if(video === null) {
            return;
        }
        const ctx = timelineCanvas.getContext("2d");
        if(ctx === null) {
            return;
        }
        const offset = Math.floor((time - sheetValue) / 5);
        const x = Math.floor(offset / 6);
        const y = offset % 6;
        ctx.drawImage(sheet,
            x * 320, y * 180, 320, 180,
            0, 0, timelineCanvas.width, timelineCanvas.height
        );
    }
    sheet.src = `${getImageEndpoint()}/${episode.show}/${episode.pos}/timeline_${sheetValue}.webp`;
}