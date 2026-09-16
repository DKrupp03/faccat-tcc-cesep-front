import { TimePicker, type TimePickerProps } from "antd";
import ptBRDatePicker from "antd/es/date-picker/locale/pt_BR";

import { CommonField } from "../CommonField/CommonField";

import styles from "../CommonDatePicker/CommonDatePicker.module.css";

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

type CommonTimePickerProps = TimePickerProps & {
	label?: string;
	required?: boolean;
};

export const CommonTimePicker: React.FC<CommonTimePickerProps> = ({
	label,
	required,
	...props
}: CommonTimePickerProps) => {
	return (
		<CommonField label={label} htmlFor={props.id} required={required}>
			<TimePicker
				size="large"
				variant="filled"
				getPopupContainer={() => document.body}
				builtinPlacements={pickerPlacements}
				className={styles.input}
				placeholder=""
				locale={ptBRDatePicker}
				format="HH:mm"
				minuteStep={5}
				needConfirm={false}
				showNow={false}
				{...props}
				classNames={{ ...props.classNames, popup: { root: styles.popup } }}
			/>
		</CommonField>
	);
};
