import { useState } from "react";
import { TimePicker, type TimePickerProps } from "antd";
import ptBRDatePicker from "antd/es/date-picker/locale/pt_BR";
import type { BaseInfo } from "@rc-component/picker/es/interface";

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
	onFocus,
	onBlur,
	required,
	...props
}: CommonTimePickerProps) => {
	const [focused, setFocused] = useState(false);

	const hasValue = !!props.value || !!props.defaultValue;
	const isFloating = focused || hasValue;

	const handleFocus = (e: React.FocusEvent<HTMLElement>, info: BaseInfo) => {
		setFocused(true);
		onFocus?.(e, info);
	};

	const handleBlur = (e: React.FocusEvent<HTMLElement>, info: BaseInfo) => {
		setFocused(false);
		onBlur?.(e, info);
	};

	const labelEl = label ? (
		<span
			className={`${styles.label} ${isFloating ? styles.labelFloating : ""}`}
		>
			{label} {required && <span className={styles.required}>*</span>}
		</span>
	) : null;

	return (
		<div className={styles.wrapper}>
			{labelEl}
			<TimePicker
				size="large"
				getPopupContainer={() => document.body}
				builtinPlacements={pickerPlacements}
				className={styles.input}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder=""
				locale={ptBRDatePicker}
				format="HH:mm"
				minuteStep={5}
				needConfirm={false}
				showNow={false}
				{...props}
				classNames={{ ...props.classNames, popup: { root: styles.popup } }}
			/>
		</div>
	);
};
