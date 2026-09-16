import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconClock24 } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { TOKENS } from "@/shared/theme";

export const WeeklyRoutineForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      variant="card"
      title={t("patients.anamnese.weeklyRoutine.title")}
      icon={<IconClock24 size={16} />}
      initialOpen={false}
    >
      <Row gutter={TOKENS.space[16]}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "weeklyRoutine"]}>
            <CommonTextArea label={t("patients.anamnese.weeklyRoutine.label")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
