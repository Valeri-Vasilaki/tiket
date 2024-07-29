declare module 'react-time-format' {
    import * as React from 'react';

    interface TimeFormatProps {
        value: string | number | Date;
        format: string;
    }

    const TimeFormat: React.FC<TimeFormatProps>;
    export default TimeFormat;
}