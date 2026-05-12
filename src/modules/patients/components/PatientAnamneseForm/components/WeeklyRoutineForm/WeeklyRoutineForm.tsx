import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { IconClock24 } from "@tabler/icons-react";

import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextArea } from "@/shared/components/CommonTextArea/CommonTextArea";
import { COLORS } from "@/shared/theme";

export const WeeklyRoutineForm = () => {
  const { t } = useTranslation();

  return (
    <CommonCollapse
      title={t("anamnese.weeklyRoutine.title")}
      icon={<IconClock24 size={16} color={COLORS.grey70} />}
      initialOpen={false}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={["anamnese_data", "weeklyRoutine"]}>
            <CommonTextArea label={t("anamnese.weeklyRoutine.label")} />
          </Form.Item>
        </Col>
      </Row>
    </CommonCollapse>
  );
};
