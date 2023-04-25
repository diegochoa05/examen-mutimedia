function setup() {

    createCanvas(1500, 900)
    c2=width/4
    c2x=width/2
    c3x=(width/4)*3
    cY=height/2
    r=150

}

function draw() {
    background(245, 345, 300)
    strokeWeight(2)

    circuloPuntoMedio(c2, cY, r)
    circuloPuntoMedio(c2x, cY, r)
    circuloPuntoMedio(c3x, cY, r)

    division = parseInt(prompt("En cuantas partes quieres partir el circulo? \n\nPrimer circulo: Punto pendiente\nSegundo circulo: DDA\nTercer circulo: Bresenham"));
    angle = 2*PI/division;

    // Circulo punto pendiente
    for (let i=0; i<division; i++) {
        let lineaX=c2+r*cos(i*angle)
        let lineaY=cY+r*sin(i*angle)
        PuntoPendiente(c2, cY, lineaX, lineaY)
    }

    // Circulo DDA
    for (let i = 0; i < division; i++) {
        let lineaX = c2x + r * cos(i*angle)
        let lineaY = cY + r * sin(i*angle)
        DDA(c2x, cY, lineaX, lineaY)
    }

    // Circulo Bresenham
    for (let i = 0; i < division; i++) {
        let lineaX = c3x + r * cos(i*angle)
        let lineaY = cY + r * sin(i*angle)
        Bresenham(c3x, cY, lineaX, lineaY)
    }
    
    noLoop()

}

function circuloPuntoMedio(x, y, radio){

    let auxX = 0
    let auxY = radio
    let d = 1 - radio

    while (auxX <= auxY) {

        point(x+auxX, y+auxY)
        point(x+auxY, y+auxX)
        point(x-auxX, y+auxY)
        point(x-auxY, y+auxX)
        point(x+auxX, y-auxY)
        point(x+auxY, y-auxX)
        point(x-auxX, y-auxY)
        point(x-auxY, y-auxX)
        
        if (d<0) {

            d+=2*auxX+3

        } else {

            d+=2*(auxX-auxY)+5
            auxY--

        }
        
        auxX++
    }
}



function PuntoPendiente(x1, y1, x2, y2) {

    incrX=0

    if (x1>x2){
        incrX=-1
    }else if(x1<x2)
        incrX=1
    
    if (x1===x2) {
        x=x1

        if(y1>y2) {
            incrY=-1
        }else{
            incrY=1
        }

        if(incrY==1) {

            for(var y=y1; y<y2; y+=incrY) {
                point(x, y)
            }

        }else {

            for (var y=y1; y>y2; y+=incrY) {
                point(x, y)
            }

        }
        
    }else{
        m = (y2 - y1) / (x2 - x1)
        b = y1 - (m * x1)
        if(incrX == 1){
            for (var x = x1; x < x2; x += incrX) {
                y = (m * x) + b
                point(x,y)
            }
        }else{

            for (var x=x1; x>x2; x+=incrX) {
                y = (m*x)+b
                point(x, y)
            }
        }
    }
}

function DDA(x1, y1, x2, y2) {

    let dx=x2-x1;
    let dy=y2-y1;
    let pasos=Math.abs(dx)>Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    let incrX=dx/pasos;
    let m=dy/pasos;
    let x=x1;
    let y=y1;
    
    for (let i=0; i<=pasos; i++) {
        point(x, y);
        x+=incrX;
        y+=m;
    }

}

function Bresenham(x1, y1, x2, y2) {

    let dx=abs(x2-x1)
    let dy=abs(y2-y1)
    let incrX=(x1<x2) ? 1 : -1
    let incrY=(y1<y2) ? 1 : -1
    let err=dx-dy

    if(incrX==1){
        if(incrY==1){
            while(x1<=x2 && y1<=y2) {

                point(x1, y1)
                let e2=2*err

                if (e2>-dy) {
                    err-=dy
                    x1+=incrX
                }

                if (e2<dx) {
                    err+=dx
                    y1+=incrY
                }

            }

        }else if(incrY==-1){
            while (x1<=x2 && y1>=y2) {

                point(x1, y1)
                let e2=2*err

                if (e2>-dy) {
                    err-=dy
                    x1+=incrX
                }

                if (e2<dx) {
                    err+=dx
                    y1+=incrY
                }
            }
        }
    }else if(incrX==-1){
        if(incrY==1){
            while (x1>=x2 && y1<=y2) {

                point(x1, y1)
                let e2=2*err

                if (e2>-dy) {
                    err-=dy
                    x1+=incrX
                }

                if (e2<dx) {
                    err+=dx
                    y1+=incrY
                }
            }

        }else if(incrY==-1){
            while (x1>=x2 && y1>=y2) {
                point(x1, y1)
                let e2=2*err

                if (e2>-dy) {
                    err-=dy
                    x1+=incrX
                }

                if (e2<dx) {
                    err+=dx
                    y1+=incrY
                }

            }
        }
    }
}