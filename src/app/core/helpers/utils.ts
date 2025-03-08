export class Utils {
/**
     * Esta función tiene dos objetivos:
     * 1-Permite acceder de forma controlada a las propiedades de un objeto json. Si un path no existe,
     * devuelve el valor por defecto o undefined. Se puede personalizar el valor retornado en caso de no
     * encontrar el path utilizando el parámetro def.
     * 2-Permite controlar las respuestas de cisat cuando debe devolver un array[] con un solo elemento,
     * pero devuelve un objeto{} si solo encuentra un resultado. En ese caso, si def es un array,
     * la función devuelve un array con el objeto encontrado.
     *
     * @param {Object} obj - Objeto a evaluar
     * @param {String} path - Ruta al cual queremos acceder. Ej: "persona.domicilio.calle"
     * @param {*} def - Valor devuelto en caso de que no exista el path.
     * @returns {*} - El valor del path encontrado o el valor por defecto.
     */
    static val(obj: any, path: string, def: any = undefined) {
        if (obj === null || obj === undefined || typeof obj === 'string') return def;

        // Dividimos el path en sus distintas propiedades
        let current = obj;
        const paths = path.split('.');

        // Iteramos sobre el path
        for (const path of paths) {
            // Verificamos que la propiedad exista y que el objeto no sea nulo o indefinido
            if (current === null || current === undefined || !(path in current)) {
                return def;
            }
            current = current[path];
        }

        // Si el valor por defecto es un array, pero el resultado es un objeto, devolvemos un array con el objeto
        if (Array.isArray(def) && !Array.isArray(current)) {
            return current === null || current === undefined ? def : [current];
        }

        // Si llega acá, devuelve el valor encontrado
        return current;
    }

    static formatToARS = (value: number | string): string => {
        const numberValue = typeof value === 'string' ? parseFloat(value) : value;

        if (isNaN(numberValue)) {
            throw new Error('El valor proporcionado no es un número válido.');
        }

        return numberValue.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
        });
    };
}


