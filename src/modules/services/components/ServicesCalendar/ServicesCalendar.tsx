import { useMemo, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Flex, Spin, Tooltip, Typography } from "antd";
import type { CalendarProps } from "antd";
import ptBRCalendar from "antd/es/calendar/locale/pt_BR";
import dayjs, { type Dayjs } from "dayjs";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";
import { formatMonthYear } from "@/shared/utils/formatters";

import { useServicesList } from "../../hooks/useServicesList";
import { useServiceForm } from "../../hooks/useServiceForm";
import { ServiceStatusIcon, getServiceStatusColor } from "../../utils/status";
import type { Service } from "../../types/service";
import styles from "./ServicesCalendar.module.css";

const { Text } = Typography;

const dayKey = (value: string | Dayjs) => dayjs(value).format("YYYY-MM-DD");

export const ServicesCalendar = () => {
  const { t } = useTranslation();
  const { services, loading, calendarMonth, changeCalendarMonth } = useServicesList();
  const { openForm } = useServiceForm();

  const servicesByDay = useMemo(() => {
    const map = new Map<string, Service[]>();

    for (const service of services) {
      const key = dayKey(service.datetime_start);
      const dayServices = map.get(key);

      if (dayServices) {
        dayServices.push(service);
      } else {
        map.set(key, [service]);
      }
    }

    for (const dayServices of map.values()) {
      dayServices.sort((a, b) => a.datetime_start.localeCompare(b.datetime_start));
    }

    return map;
  }, [services]);

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type !== "date") return info.originNode;

    const dayServices = servicesByDay.get(dayKey(current));

    if (!dayServices?.length) return null;

    return (
      <ul className={styles.events}>
        {dayServices.map((service) => (
          <li key={service.id}>
            <Tooltip title={service.patient?.name}>
              <div
                className={styles.event}
                style={{ "--status-color": getServiceStatusColor(service.status) } as CSSProperties}
                onClick={(e) => {
                  e.stopPropagation();
                  openForm(service.id);
                }}
              >
                <ServiceStatusIcon status={service.status} size={14} />
                <span className={styles.time}>
                  {dayjs(service.datetime_start).format("HH:mm")}
                </span>
                <span className={styles.name}>{service.patient?.name}</span>
              </div>
            </Tooltip>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Spin spinning={loading}>
        <Calendar
          value={calendarMonth}
          locale={ptBRCalendar}
          mode="month"
          cellRender={cellRender}
          headerRender={({ value }) => (
            <Flex align="center" justify="space-between" className={styles.header}>
              <Flex align="center" gap={12}>
                <Tooltip title={t("services.calendar.previousMonth")}>
                  <CommonButton
                    onClick={() => changeCalendarMonth(value.subtract(1, "month"))}
                    icon={<IconChevronLeft size={18} />}
                    circular
                    outline
                  />
                </Tooltip>
                <Text className={styles.monthLabel}>
                  {formatMonthYear(value.toDate())}
                </Text>
                <Tooltip title={t("services.calendar.nextMonth")}>
                  <CommonButton
                    onClick={() => changeCalendarMonth(value.add(1, "month"))}
                    icon={<IconChevronRight size={18} />}
                    circular
                    outline
                  />
                </Tooltip>
              </Flex>
              <CommonButton
                onClick={() => changeCalendarMonth(dayjs())}
                outline
              >
                {t("services.calendar.today")}
              </CommonButton>
            </Flex>
          )}
        />
      </Spin>
    </div>
  );
};
