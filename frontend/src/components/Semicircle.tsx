export default function Semicircle({ value } : { value: number }) {
    function mapearColor(valor: number, alpha: number) {
        // Limitamos el valor dentro del rango de 0 a 100
        valor = Math.min(Math.max(valor, 0), 100);
      
        let rojo, verde, azul;
      
        if (valor <= 50) {
          // Rojo a amarillo
          rojo = 255;
          verde = Math.round((255 / 50) * valor);
          azul = 0;
        } else {
          // Amarillo a verde
          rojo = Math.round(255 - ((valor - 50) * 255) / 50);
          verde = 255;
          azul = 0;
        }

        // Ajustamos la intensidad del color según el valor de alpha
        rojo = Math.round(rojo * alpha);
        verde = Math.round(verde * alpha);
        azul = Math.round(azul * alpha);
      
        // Retorna el color en formato RGB
        return `rgb(${rojo}, ${verde}, ${azul})`;
    }

    return (
        <div className="semicircle">
            <div className="innerCircle"></div>
            <div className="value">{value}%</div>

            <style>{`
                .semicircle {
                    position: relative;
                    width: 160px;
                    height: 80px;
                    border-top-left-radius: 100px;
                    border-top-right-radius: 100px;
                    background-image: radial-gradient(circle at 0 100%, ${mapearColor(value, 0.65)}, ${mapearColor(value, 1)});
                }

                .innerCircle {
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    height: 80%;
                    border-top-left-radius: 100px;
                    border-top-right-radius: 100px;
                    background-color: rgb(var(--background-start-rgb));
                }

                .value {
                    position: absolute;
                    display: flex;
                    width: 100%;
                    height: 100%;
                    font-size: 26px;
                    justify-content: center;
                    align-items: flex-end;
                }
            `}
            </style>
        </div>
    );
}