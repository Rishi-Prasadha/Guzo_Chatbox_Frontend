import { useMemo } from "react";

const NameAreaInput = ({
  gordonTaylor,
  cEO,
  solidemojiHappy,
  solidemojiHappy1,
  propFlex,
  propAlignSelf,
  propHeight,
  propAlignSelf1,
  propHeight1,
  propPadding,
  propHeight2,
}) => {
  const nameAreaInputStyle = useMemo(() => {
    return {
      flex: propFlex,
      alignSelf: propAlignSelf,
    };
  }, [propFlex, propAlignSelf]);

  const profileImageStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const uploadProfilePhotoContainerStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
    };
  }, [propAlignSelf1]);

  const frameNameAreaStyle = useMemo(() => {
    return {
      height: propHeight1,
      padding: propPadding,
    };
  }, [propHeight1, propPadding]);

  const nameStyle = useMemo(() => {
    return {
      height: propHeight2,
    };
  }, [propHeight2]);

  return (
    <div
      className="flex-1 rounded-3xs box-border flex flex-col items-end justify-start py-2.5 px-[9px] gap-[20px] max-w-full shrink-0 text-left text-xs text-neutral-60 font-text-l-medium border-[1px] border-solid border-black"
      style={nameAreaInputStyle}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-[10px] text-sm text-neutral-90">
        <div
          className="self-stretch h-5 relative tracking-[-0.01em] leading-[20px] font-medium inline-block"
          style={profileImageStyle}
        >
          Profile Image
        </div>
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5 text-center text-xs text-black">
          <div className="h-[150px] w-[150px] rounded-81xl bg-neutral-601 overflow-hidden shrink-0 flex flex-row items-start justify-start py-[61px] px-0 box-border">
            <div
              className="ml-[-25px] h-7 w-[200px] relative tracking-[-0.01em] leading-[15px] inline-block shrink-0"
              style={uploadProfilePhotoContainerStyle}
            >
              <p className="m-0">Upload Profile Photo*</p>
              <p className="m-0 text-darkslategray">
                <i className="font-light">(Acceptable: jpeg, png)</i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="self-stretch h-14 flex flex-col items-start justify-start pt-0 px-0 pb-[30px] box-border gap-[4px] text-sm text-neutral-90"
        style={frameNameAreaStyle}
      >
        <div
          className="self-stretch h-5 relative tracking-[-0.01em] leading-[20px] font-medium inline-block"
          style={nameStyle}
        >
          Name
        </div>
        <div className="self-stretch h-8 rounded-lg bg-neutral-10 box-border overflow-hidden shrink-0 flex flex-row items-start justify-start p-1.5 text-power-black-power-black-500 border-[1px] border-solid border-power-black-power-black-50">
          <div className="self-stretch w-52 relative tracking-[-0.01em] leading-[20px] font-medium inline-block shrink-0">
            {gordonTaylor}
          </div>
        </div>
      </div>
      <div className="relative leading-[18px] hidden" />
      <div className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-neutral-90">
        <div className="self-stretch h-5 relative tracking-[-0.01em] leading-[20px] font-medium inline-block">
          Role
        </div>
        <div className="self-stretch h-8 rounded-lg bg-neutral-10 box-border overflow-hidden shrink-0 flex flex-row items-start justify-start p-1.5 text-power-black-power-black-500 border-[1px] border-solid border-power-black-power-black-50">
          <div className="self-stretch w-52 relative tracking-[-0.01em] leading-[20px] font-medium inline-block shrink-0">
            {cEO}
          </div>
        </div>
      </div>
      <div className="relative leading-[18px] hidden" />
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
        <div className="self-stretch relative leading-[18px] hidden" />
        <div className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-neutral-90">
          <div className="self-stretch h-5 relative tracking-[-0.01em] leading-[20px] font-medium inline-block">
            Email
          </div>
          <div className="self-stretch h-8 rounded-lg bg-neutral-10 box-border overflow-hidden shrink-0 flex flex-row items-center justify-start p-1.5 text-power-black-power-black-500 border-[1px] border-solid border-power-black-power-black-50">
            <div className="self-stretch w-52 relative tracking-[-0.01em] leading-[20px] font-medium inline-block shrink-0 whitespace-nowrap">
              customercare@guzo.io
            </div>
          </div>
          <div className="self-stretch relative text-xs leading-[18px] text-neutral-60 hidden" />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
        <div className="self-stretch relative leading-[18px] hidden" />
        <div className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-neutral-90">
          <div className="self-stretch h-5 relative tracking-[-0.01em] leading-[20px] font-medium inline-block">
            Phone
          </div>
          <div className="self-stretch h-8 rounded-lg bg-neutral-10 box-border overflow-hidden shrink-0 flex flex-row items-center justify-start p-1.5 text-power-black-power-black-500 border-[1px] border-solid border-power-black-power-black-50">
            <div className="self-stretch w-52 relative tracking-[-0.01em] leading-[20px] font-medium inline-block shrink-0">
              (777) 777-7777
            </div>
          </div>
          <div className="self-stretch relative text-xs leading-[18px] text-neutral-60 hidden" />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
        <div className="self-stretch relative leading-[18px] hidden" />
        <div className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-neutral-90">
          <div className="self-stretch h-5 relative tracking-[-0.01em] leading-[20px] font-medium inline-block">
            LinkedIn
          </div>
          <div className="self-stretch h-8 rounded-lg bg-neutral-10 box-border overflow-hidden shrink-0 flex flex-row items-center justify-start p-1.5 text-power-black-power-black-500 border-[1px] border-solid border-power-black-power-black-50">
            <div className="self-stretch w-52 relative tracking-[-0.01em] leading-[20px] font-medium inline-block shrink-0">
              <span>www.linkedin.com/in/guzo</span>
              <span className="text-neutral-60">{` `}</span>
            </div>
          </div>
          <div className="self-stretch relative text-xs leading-[18px] text-neutral-60 hidden" />
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
        <div className="self-stretch relative leading-[18px] hidden" />
        <div className="self-stretch flex flex-col items-start justify-start gap-[4px] text-sm text-neutral-90">
          <div className="self-stretch h-5 relative tracking-[-0.01em] leading-[20px] font-medium inline-block">{`Scheduling `}</div>
          <div className="self-stretch h-8 rounded-lg bg-neutral-10 box-border overflow-hidden shrink-0 flex flex-row items-center justify-start p-1.5 text-power-black-power-black-500 border-[1px] border-solid border-power-black-power-black-50">
            <div className="self-stretch w-52 relative tracking-[-0.01em] leading-[20px] font-medium inline-block shrink-0">
              www.calendly.com/guzo
            </div>
          </div>
          <div className="self-stretch relative text-xs leading-[18px] text-neutral-60 hidden" />
        </div>
      </div>
      <div className="w-[165px] h-10 rounded-3xl bg-gray-200 flex flex-row items-start justify-start py-2 px-5 box-border gap-[4px] text-base text-neutral-10">
        <img
          className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
          alt=""
          src={solidemojiHappy}
        />
        <div className="self-stretch flex-1 relative tracking-[-0.01em] leading-[24px] font-medium">
          Remove Contact
        </div>
        <img
          className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
          alt=""
          src={solidemojiHappy1}
        />
      </div>
    </div>
  );
};

export default NameAreaInput;
