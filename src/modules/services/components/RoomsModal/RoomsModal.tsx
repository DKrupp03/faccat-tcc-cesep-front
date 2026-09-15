import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Flex, Skeleton, Typography } from "antd";
import { IconTrash } from "@tabler/icons-react";

import { CommonModal } from "@/shared/components/CommonModal/CommonModal";
import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { CommonCollapse } from "@/shared/components/CommonCollapse/CommonCollapse";
import { CommonTextInput } from "@/shared/components/CommonTextInput/CommonTextInput";
import { useNotification } from "@/shared/hooks/useNotification";
import RoomsService from "@/shared/services/RoomsService";
import type { Room } from "@/shared/types/room";

import styles from "./RoomsModal.module.css";

type RoomsModalProps = {
  isOpen: boolean;
  close: () => void;
};

type RoomsFormValues = {
  rooms?: Partial<Room>[];
};

const { Text } = Typography;

export const RoomsModal = ({ isOpen, close }: RoomsModalProps) => {
  const { t } = useTranslation();
  const { openNotification } = useNotification();

  const [form] = Form.useForm<RoomsFormValues>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const requiredRule = useMemo(
    () => [{ required: true, whitespace: true, message: t("common.errors.required") }],
    [t],
  );

  // O formulário só é montado depois do carregamento, então cada abertura
  // parte da lista atual do servidor (alterações não salvas são descartadas).
  useEffect(() => {
    if (!isOpen) return;

    let active = true;
    setLoading(true);

    RoomsService.getRooms()
      .then((response) => {
        if (!active) return;
        if (!response.success) throw new Error(response.error);
        setRooms(response.rooms);
      })
      .catch((error) => console.error(error || t("common.errors.unknown")))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isOpen, t]);

  const handleSave = async () => {
    let values: RoomsFormValues;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await RoomsService.syncRooms(values.rooms ?? []);

      if (!response.success) {
        openNotification("error", response.errors!);
        return;
      }

      openNotification("success", t("services.rooms.saved"));
      close();
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerContent = (
    <>
      <CommonButton onClick={close} outline>
        {t("common.actions.cancel")}
      </CommonButton>
      <CommonButton onClick={handleSave} buttonVariant="primary" loading={isSubmitting}>
        {t("common.actions.save")}
      </CommonButton>
    </>
  );

  return (
    <CommonModal
      title={t("services.rooms.title")}
      isOpen={isOpen}
      close={close}
      footer={footerContent}
    >
      {loading ? (
        <Skeleton className={styles.form} paragraph={{ rows: 3 }} active />
      ) : (
        <Form
          form={form}
          name="rooms-form"
          initialValues={{ rooms }}
          className={styles.form}
        >
          <Form.List name="rooms">
            {(fields, { add, remove }) => (
              <CommonCollapse
                title={t("services.rooms.title")}
                onClickAdd={() => add({})}
                shouldShowAddButton
                hideExpandButton
              >
                {fields.map((field) => (
                  <Flex key={field.key} gap={16} align="flex-start">
                    <Form.Item name={[field.name, "id"]} hidden noStyle />
                    {/* Largura fixa no botão: numa Col estreita ele era
                        espremido e deixava de ser redondo. */}
                    <Form.Item
                      name={[field.name, "name"]}
                      rules={requiredRule}
                      className={styles.name}
                    >
                      <CommonTextInput
                        label={t("services.rooms.name")}
                        maxLength={100}
                        required
                      />
                    </Form.Item>
                    <Flex align="center" className={styles.remove}>
                      <CommonButton
                        onClick={() => remove(field.name)}
                        icon={<IconTrash size={16} />}
                        buttonVariant="danger"
                        size="small"
                        circular
                      />
                    </Flex>
                  </Flex>
                ))}
                {fields.length === 0 && (
                  <Text>{t("services.rooms.none")}</Text>
                )}
              </CommonCollapse>
            )}
          </Form.List>
        </Form>
      )}
    </CommonModal>
  );
};
