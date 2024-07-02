export function resizeWindow(x: number = 1920, y: number = 1080){
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
}
