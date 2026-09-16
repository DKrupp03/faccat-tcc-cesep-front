import { DatePicker, type DatePickerProps } from "antd";
import ptBRDatePicker from "antd/es/date-picker/locale/pt_BR";

import { CommonField } from "../CommonField/CommonField";

import styles from "./CommonDatePicker.module.css";

const pickerPlacements = {
	bottomLeft: {
		points: ["tl", "bl"],
		offset: [0, 4],
		overflow: { adjustX: 1, adjustY: 1, shiftY: true },
	},
	bottomRight: {
		points: ["tr", "br"],
		offset: [0, 4],
		overflow: { adjustX: 1, adjustY: 1, shiftY: true },
	},
	topLeft: {
		points: ["bl", "tl"],
		offset: [0, -4],
		overflow: { adjustX: 0, adjustY: 1, shiftY: true },
	},
	topRight: {
		points: ["br", "tr"],
		offset: [0, -4],
		overflow: { adjustX: 0, adjustY: 1, shiftY: true },
	},
};

type CommonDatePickerProps = DatePickerProps & {
	label?: string;
	required?: boolean;
};

export const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
	label,
	required,
	...props
}: CommonDatePickerProps) => {
	return (
		<CommonField label={label} required={required}>
			<DatePicker
				size="large"
				variant="filled"
				getPopupContainer={() => document.body}
				builtinPlacements={pickerPlacements}
				className={styles.input}
				placeholder=""
				locale={ptBRDatePicker}
				format={{
					format: "DD/MM/YYYY",
					type: "mask",
				}}
				{...props}
				classNames={{ ...props.classNames, popup: { root: styles.popup } }}
			/>
		</CommonField>
	);
};
