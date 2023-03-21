import { useEffect, useRef, useState } from "react";

interface DebounceProps {
  value: any;
  onChange: (param: any) => void;
  timeoutMs?: number;
}

const useDebounce = ({ value, onChange, timeoutMs = 300 }: DebounceProps) => {
  const [_value, set_value] = useState(value);
  const tid = useRef<any>(null);

  useEffect(() => {
    if (_value !== value) {
      clearTimeout(tid.current);
      tid.current = setTimeout(() => onChange(_value), timeoutMs);
    }
  }, [_value]);

  useEffect(() => {
    set_value(value);
  }, [value]);

  return { _value, set_value };
};

export default useDebounce;
