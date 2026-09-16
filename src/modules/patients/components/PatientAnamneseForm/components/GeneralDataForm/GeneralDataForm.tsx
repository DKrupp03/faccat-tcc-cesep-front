import { Form, Row, Col, Flex } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { CommonDatePicker } from "@/shared/components/CommonDatePicker";
import { CommonGroupButtons } from "@/shared/components/CommonGroupButtons/CommonGroupButtons";
import { ProfilesSelect } from "@/shared/components/ProfilesSelect/ProfilesSelect";

import { usePatientForm } from "@/modules/patients/hooks/usePatientForm";
import { TOKENS } from "@/shared/theme";

import styles from "./GeneralDataForm.module.css";

const ANAMNESE_TYPES = ["adult", "adolescent", "child"] as const;

export const GeneralDataForm = () => {
  const { t } = useTranslation();
  const {
    patient,
    therapistId,
  } = usePatientForm();

  return (
    <Flex vertical gap={TOKENS.space[16]}>
      <Flex align="center" gap={TOKENS.space[16]} wrap className={styles.typeBlock}>
        <span className={styles.typeLabel}>
          {t("patients.anamnese.generalData.type")}
        </span>
        <Form.Item name="anamnese_type" noStyle>
          <CommonGroupButtons tone="accent" fit>
            {ANAMNESE_TYPES.map((type) => (
              <CommonGroupButtons.Button key={type} value={type}>
                {t(`patients.anamnese.generalData.types.${type}`)}
              </CommonGroupButtons.Button>
            ))}
          </CommonGroupButtons>
        </Form.Item>
        <span className={styles.typeHint}>
          {t("patients.anamnese.generalData.typeHint")}
        </span>
      </Flex>

      <Row gutter={TOKENS.space[16]}>
        <Col span={12}>
          <Form.Item name="therapist_id" className={styles.lastItem}>
            <ProfilesSelect
              role="therapist"
              label={t("patients.anamnese.generalData.therapist")}
              disabled={!!patient?.anamnese || !!therapistId}
              allowClear={false}
              required
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="created_at"
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
            className={styles.lastItem}
          >
            <CommonDatePicker
              label={t("patients.anamnese.generalData.date")}
              disabled={!!patient?.anamnese}
              required
            />
          </Form.Item>
        </Col>
      </Row>
    </Flex>
  );
};
