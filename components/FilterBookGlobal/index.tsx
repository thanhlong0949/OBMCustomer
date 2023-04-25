import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {Button} from "antd";
import "./index.scss";

interface IFilterBookGlobal {
  handleButton?: () => void;
  dataFilter?: object;
  setDataFilter?: any;
}
export function FilterBookGlobal(props: IFilterBookGlobal): JSX.Element {
  const {handleButton, dataFilter, setDataFilter} = props;
  const handleSelectTime = (value: string): void => {
    // arrow function
    setDataFilter({...dataFilter, selectTime: value});
  };
  const handleSelectPrice = (value: string): void => {
    setDataFilter({...dataFilter, sortPrice: value});
  };
  const listSelectOption = [
    {
      title: "Thời gian",
      defaultValue: 1,
      placeholder: "Chọn thời gian",
      width: 120,
      handleChange: handleSelectTime,
      optionSelect: [
        {
          value: 1,
          label: "Tất cả",
        },
        {
          value: 2,
          label: "Mới nhất",
        },
        {
          value: 3,
          label: "Gần đây",
        },
      ],
    },
    {
      title: "Chọn giá",
      defaultValue: 1,
      placeholder: "Chọn giá",
      width: 120,
      handleChange: handleSelectPrice,
      optionSelect: [
        {
          value: 1,
          label: "Tất cả",
        },
        {
          value: 2,
          label: "Từ thấp đến cao",
        },
        {
          value: 3,
          label: "Từ cao xuống thấp",
        },
      ],
    },
  ];

  return (
    <div className="filter-book-global">
      <FilterGroupGlobal listSelectOption={listSelectOption} />
      <Button type="primary" style={{borderRadius: 20}} onClick={handleButton}>
        Đăng Bán Sách
      </Button>
    </div>
  );
}
