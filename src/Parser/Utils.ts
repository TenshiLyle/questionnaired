export default class Utils {
    static isOptionMarker( code: number ): boolean {
        switch( code ) {
            case 0x41: // A
            case 0x42: // B
            case 0x43: // C
            case 0x44: // D
            case 0x45: // E
            case 0x46: // F
            case 0x47: // G
            case 0x48: // H
            case 0x49: // I
            case 0x4A: // J
            case 0x4B: // K
            case 0x4C: // L
            case 0x4D: // M
            case 0x4E: // N
            case 0x4F: // O
            case 0x50: // P
            case 0x51: // Q
            case 0x52: // R
            case 0x53: // S
            case 0x54: // T
            case 0x55: // U
            case 0x56: // V
            case 0x57: // W
            case 0x58: // X
            case 0x59: // Y
            case 0x5A: // Z
            case 0x61: // a
            case 0x62: // b
            case 0x63: // c
            case 0x64: // d
            case 0x65: // e
            case 0x66: // f
            case 0x67: // g
            case 0x68: // h
            case 0x69: // i
            case 0x6A: // j
            case 0x6B: // K
            case 0x6C: // l
            case 0x6D: // m
            case 0x6E: // n
            case 0x6F: // o
            case 0x70: // p
            case 0x71: // q
            case 0x72: // r
            case 0x73: // s
            case 0x74: // t
            case 0x75: // u
            case 0x76: // v
            case 0x77: // w
            case 0x78: // x
            case 0x79: // y
            case 0x7A: // z
                return true;
        }

        return false;
    }

    static isDot( code: number ): boolean {
        switch( code ) {
            case 0x2E:
                return true;
        }

        return false;
    }

    static isSpace( code: number ): boolean {
        switch( code ) {
            case 0x09:
            case 0x20:
                return true;
        }

        return false;
    }

    static isAnswerProofMarker( line: string ): boolean {
        if ( line.length < 6 ) {
            return false;
        }

        if ( line.charCodeAt(0) == 0x40         // @
            && line.charCodeAt(1) == 0x70       // p
            && line.charCodeAt(2) == 0x72       // r
            && line.charCodeAt(3) == 0x6F       // o
            && line.charCodeAt(4) == 0x6F       // o
            && line.charCodeAt(5) == 0x66       // f
            && line.charCodeAt(6) === 0x3A ) {  // :
                return true;
        }

        return false;
    }
}
