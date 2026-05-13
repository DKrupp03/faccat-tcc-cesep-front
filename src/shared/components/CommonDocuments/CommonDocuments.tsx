import { useRef } from "react";
import { Flex, Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
  IconDownload,
  IconExternalLink,
  IconFile,
  IconFiles,
  IconTrash,
} from "@tabler/icons-react";

import { CommonCollapse } from "../CommonCollapse/CommonCollapse";
import { CommonButton } from "../CommonButton/CommonButton";
import { COLORS } from "../../theme";

import styles from "./CommonDocuments.module.css";

const { Text } = Typography;

export type CommonDocument = {
  id: number | string;
  name: string;
  url: string;
};

export type CommonDocumentsProps = {
  documents: CommonDocument[];
  pendingFiles?: File[];
  onUpload?: (files: File[]) => void;
  onRemove?: (id: number | string) => void;
  onRemovePending?: (index: number) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
};

export const CommonDocuments = ({
  documents,
  pendingFiles = [],
  onUpload,
  onRemove,
  onRemovePending,
  label,
  accept,
  multiple = true,
  disabled = false,
}: CommonDocumentsProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const isEmpty = documents.length === 0 && pendingFiles.length === 0;

  const handleAdd = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0 && onUpload) {
      onUpload(files);
    }
    event.target.value = "";
  };

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommonCollapse
      title={label ?? t("common.documents.title")}
      icon={<IconFiles size={16} color={COLORS.grey70} />}
      shouldShowAddButton={!!onUpload && !disabled}
      onClickAdd={handleAdd}
    >
      {onUpload && (
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFilesSelected}
          hidden
          style={{ display: "none" }}
        />
      )}

      {isEmpty ? (
        <Text>{t("common.documents.empty")}</Text>
      ) : (
        <Flex vertical gap={4}>
          {documents.map((doc) => (
            <Flex
              key={doc.id}
              align="center" justify="space-between" gap={12}
              className={styles.item}
            >
              <Flex align="center" gap={8}>
                <IconFile size={16} color={COLORS.grey70} />
                <Text className={styles.name}>{doc.name}</Text>
              </Flex>
              <Flex align="center" gap={4}>
                <Tooltip title={t("common.documents.open")}>
                  <CommonButton
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<IconExternalLink size={16} />}
                    size="small"
                    circular
                    outline
                  />
                </Tooltip>
                <Tooltip title={t("common.documents.download")}>
                  <CommonButton
                    onClick={() => handleDownload(doc.url, doc.name)}
                    icon={<IconDownload size={16} />}
                    size="small"
                    circular
                    outline
                  />
                </Tooltip>
                {onRemove && (
                  <Tooltip title={t("common.documents.remove")}>
                    <CommonButton
                      onClick={() => onRemove(doc.id)}
                      icon={<IconTrash size={16} />}
                      disabled={disabled}
                      buttonVariant="danger"
                      size="small"
                      circular
                    />
                  </Tooltip>
                )}
              </Flex>
            </Flex>
          ))}

          {pendingFiles.map((file, idx) => (
            <Flex
              key={idx}
              align="center" justify="space-between" gap={12}
              className={styles.item}
            >
              <Flex align="center" gap={8}>
                <IconFile size={16} color={COLORS.grey70} />
                <Text className={styles.name}>{file.name}</Text>
                <Flex align="center" className={styles.pendingTag}>
                  {t("common.documents.pending")}
                </Flex>
              </Flex>
              <Flex align="center" gap={4}>
                {onRemovePending && (
                  <Tooltip title={t("common.documents.remove")}>
                    <CommonButton
                      onClick={() => onRemovePending(idx)}
                      icon={<IconTrash size={16} />}
                      disabled={disabled}
                      buttonVariant="danger"
                      size="small"
                      circular
                    />
                  </Tooltip>
                )}
              </Flex>
            </Flex>
          ))}
        </Flex>
      )}
    </CommonCollapse>
  );
};
