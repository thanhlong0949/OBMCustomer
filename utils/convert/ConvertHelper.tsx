import moment, {Moment} from "moment";
import _ from "lodash";
interface ISelectOption {
  label: string;
  value: string | number;
}
interface IConvertOptions {
  selected: string | number | undefined;
  options: ISelectOption[];
}

function renameKeys(obj: any, newKeys: any) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    if (!newKeys[key]) {
      delete obj[key];
    }
    return {[newKey]: obj[key]};
  });
  return Object.assign({}, ...keyValues);
}
export interface ISelectOptions {
  value: number | string;
  selected: boolean;
  name: string;
}

function convertSelect(
  selectOptions: ISelectOptions[] | undefined
): IConvertOptions {
  const option: ISelectOption[] = [];
  let selectedTmp;
  if (selectOptions) {
    selectOptions.forEach((item, index) => {
      option.push({
        label: item.name,
        value: item.value,
      });
      if (item.selected) {
        selectedTmp = item.value;
      }
    });
  }
  return {selected: selectedTmp, options: option};
}

// Moment => Timestamp
function convertTime(date?: Moment, isEndDate?: boolean): number {
  if (!date) return 0;
  if (isEndDate) {
    return date.set({hour: 23, minute: 59, second: 59}).unix();
  }
  return date.set({hour: 0, minute: 0, second: 0}).unix();
}

// Timestamp => Date
function convertTimestampToDate(timestamp?: number, format?: string): string {
  if (!timestamp) return "-";
  return moment.unix(timestamp).format(format || "DD.MM.YYYY");
}

//format money
function getMoneyFormat(number: number, n?: any, x?: any) {
  if (!_.isNumber(number)) {
    number = parseInt(number, 10);
  }
  const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  // eslint-disable-next-line no-bitwise
  return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
}

export {
  renameKeys,
  convertTime,
  convertTimestampToDate,
  convertSelect,
  getMoneyFormat,
};
