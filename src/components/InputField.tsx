import React, { ReactNode } from 'react'
import Select from 'react-select';

type InputFieldProps = {
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    label?: string;
    labelRight?: ReactNode;
    placeholder: string;
    type?: "text" | "password" | "email" | "date" | "time" | "file" | "select" | 'number';
    inputLeft?: ReactNode;
    children?: ReactNode;
    multiple?: boolean;
    options?: { value: string; label: string }[]
    setSelectChange?: (option: {
        value: string;
        label: string
    }) => void
    ref?: React.RefObject<HTMLInputElement>
    readOnly?: boolean;
    defaultSelectedValue?: {
        value: string;
        label: string
    },
    autoFocus?: boolean
};

export default function InputField({ value, onChange, label, labelRight, placeholder, type, inputLeft, children, readOnly, multiple, options, setSelectChange, ref, defaultSelectedValue, autoFocus }: InputFieldProps) {
    const name = label?.toLowerCase().replace(/\s+/g, '_');

    const inputProps = {
        id: name,
        name,
        value,
        onChange,
        placeholder,
        type,
        ref,
        readOnly,
        autoFocus,
        className: `w-full ${inputLeft ? "pl-10" : "pl-4"} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 read-only:cursor-not-allowed read-only:opacity-50`,
    };

    return (
        <div className='mb-4'>
            {label && (
                <div className="flex items-center justify-between gap-4">
                    <label htmlFor={label.replace(/\s+/g, '')} className="text-gray-700 text-sm font-semibold flex items-center justify-between gap-8 w-full">
                        <span>{label} {type == "file" && <span className='text-xs font-normal'>(.png, .jpg, .jpeg)</span>}</span>

                        {
                            type == "file" && (
                                <span className='text-xs font-normal'>16:9 ratio</span>
                            )
                        }
                    </label>
                    {labelRight && <div>{labelRight}</div>}
                </div>
            )}

            <div className="relative rounded-md shadow-sm">
                {(type != "select" && inputLeft) && (
                    <div className={`absolute left-0 ${type ? "pl-3 inset-y-0" : "pl-3 top-3"} flex items-center pointer-events-none`}>
                        {inputLeft}
                    </div>
                )}

                {
                    type == "select" ? (
                        <Select
                            id={name}
                            options={options}
                            onChange={(opt) => opt?.value && setSelectChange && setSelectChange(opt)}
                            value={defaultSelectedValue}
                        />
                    )
                        :
                        type == "file" ?
                            (
                                <input
                                    {...inputProps}
                                    multiple={multiple}
                                    accept='.png, .jpeg, .jpg'
                                />
                            )
                            :

                            type ? (
                                <input
                                    {...inputProps}
                                />
                            ) : (
                                <textarea
                                    id={name}
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                    placeholder={placeholder}
                                    className={`w-full ${inputLeft ? "pl-10" : "pl-4"} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 resize-none`} rows={2}>
                                </textarea>
                            )
                }
            </div>
        </div>
    )
}
