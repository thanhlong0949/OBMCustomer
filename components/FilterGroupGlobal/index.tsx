import React from "react";
import "./index.scss";
import {Input, Select, DatePicker, Tooltip, Cascader} from "antd";
import {convertTime} from "@app/utils/convert/ConvertHelper";

export interface ListSearchTextType {
  placeHolder?: string;
  onSearch: (value: string) => void;
  width?: number;
  maxLength?: number;
  tooltip?: string;
}

export interface ListSelectOptionType {
  defaultValue?: string | number;
  handleChange: (value?: any) => void;
  mode?: "multiple" | "tags";
  placeholder?: string;
  width?: number;
  optionSelect: {
    value: string | number;
    label: string;
  }[];
  loading?: boolean;
  tooltip?: string;
  title?: string;
}

export interface ListDatePickerType {
  onChange: (startTime: number, endTime: number) => void;
  width?: number;
  tooltip?: string;
  title?: string;
}

export interface ListCascaderType {
  onChangeCascader: (values: any) => void;
  placeHolder?: string;
  optionGroup?: {
    value: string;
    label: string;
    tooltip?: string;
    children: {
      value: string;
      label: string;
    }[];
  }[];
}

export interface FilterGroupGlobalProps {
  listSearchText?: ListSearchTextType[];
  listSelectOption?: ListSelectOptionType[];
  listDatePicker?: ListDatePickerType[];
  listCascader?: ListCascaderType[];
}
export interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

function FilterGroupGlobal(props: FilterGroupGlobalProps): JSX.Element {
  const {listSearchText, listSelectOption, listDatePicker, listCascader} =
    props;

  const {Search} = Input;
  const {RangePicker} = DatePicker;

  return (
    <div className="group-filter-global">
      {listSearchText &&
        listSearchText.map((item, index) => (
          <Tooltip key={index} title={item.tooltip}>
            <Search
              placeholder={item.placeHolder ?? "Tìm kiếm..."}
              allowClear
              onSearch={item.onSearch}
              style={{width: item.width ? item.width : 200}}
              className="search-text"
              enterButton
              maxLength={item.maxLength}
            />
          </Tooltip>
        ))}

      {listCascader &&
        listCascader.map((item, index) => (
          // <Tooltip key={index} title={item.tooltip}>
          <Cascader
            key={index}
            options={item.optionGroup}
            onChange={item.onChangeCascader}
            placeholder={item.placeHolder}
            className="slect-option"
          />
          // </Tooltip>
        ))}

      {listSelectOption &&
        listSelectOption.map((item, index) => (
          <Tooltip key={index} title={item.tooltip}>
            <div style={{marginRight: 10}}>
              <span style={{marginRight: 3}}>{item.title}: </span>
              <Select
                mode={item.mode}
                // allowClear
                placeholder={item.placeholder}
                defaultValue={item.defaultValue}
                style={{width: item.width ? item.width : 200}}
                onChange={item.handleChange}
                options={item.optionSelect}
                className="slect-option"
                loading={item.loading}
              />
            </div>
          </Tooltip>
        ))}

      {listDatePicker &&
        listDatePicker.map((item, index) => (
          <Tooltip key={index} title={item.tooltip}>
            <div style={{marginLeft: 10}}>
              <span style={{marginRight: 3}}>{item.title}: </span>
              <RangePicker
                onChange={(dates: any): void => {
                  let startTime = 0;
                  let endTime = 0;
                  if (dates && dates.length > 0) {
                    startTime = convertTime(dates[0]);
                    endTime = convertTime(dates[1], true);
                  }
                  item.onChange(startTime, endTime);
                }}
                style={{width: item.width ? item.width : 250}}
                className="date-picker"
                format="DD-MM-YYYY"
              />
            </div>
          </Tooltip>
        ))}
    </div>
  );
}

export default FilterGroupGlobal;
