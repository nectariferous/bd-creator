import { FaIdCard } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa";
import { FaRegIdCard } from "react-icons/fa";
import { VscServerProcess } from "react-icons/vsc";
import { FaFingerprint } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { FaSearchLocation } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { TbPasswordMobilePhone } from "react-icons/tb";
import bkash from "../assets/b.svg";
import nagod from "../assets/n.svg";
import { FaHome } from "react-icons/fa";
import { GiLoveInjection } from "react-icons/gi";
import { FaCodePullRequest } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { FaCcMastercard } from "react-icons/fa";
export const navDatas = [
  {
    icon: <FaIdCard />,
    path: "/dashboard/create-nid",
    element: "এনআইডি মেক",
  },
  {
    icon: <FaFileSignature />,
    path: "/dashboard/sign-copy",
    element: "সাইন কপি",
  },

  {
    icon: <FaRegIdCard />,
    path: "/dashboard/nid-card",
    element: "এনআইডি কার্ড",
  },

  {
    icon: <VscServerProcess />,
    path: "/dashboard/server-copy-unofficial",
    element: "সার্ভার কপি ",
  },
  {
    icon: <VscServerProcess />,
    path: "/dashboard/server-to-nid",
    element: "সার্ভার কপি to এনআইডি মেক",
  },
  {
    icon: <FaFingerprint />,
    path: "/dashboard/bayometric",
    element: "বায়োমেট্রিক",
  },
  {
    icon: <IoIosCall />,
    path: "/dashboard/call-list",
    element: "কল লিস্ট অল সিম",
  },
  {
    icon: <GiLoveInjection />,
    path: "/dashboard/tika",
    element: "সুরক্ষা টিকা",
  },
  {
    icon: <GrCertificate />,
    path: "/dashboard/nibondhon",
    element: "জন্ম নিবন্ধন (Online)",
  },
  {
    icon: <FaUserEdit />,
    path: "/dashboard/name-correction",
    element: "নিবন্ধন নাম কারেকশন ",
  },

  {
    img: bkash,
    path: "/dashboard/bkash-info",
    element: "বিকাশ ইনফো",
  },
  {
    img: nagod,
    path: "/dashboard/nogod-info",
    element: "নগদ ইনফো",
  },
  {
    icon: <TbPasswordMobilePhone />,
    path: "/dashboard/bkash-pin-reset",
    element: "বিকাশ পিন রিসেট",
  },
  {
    icon: <FaSearchLocation />,
    path: "/dashboard/name-address",
    element: "নাম ঠিকনা (হারানো আইডি)",
  },
  {
    icon: <FaFileAlt />,
    path: "/dashboard/file-list",
    element: "ফাইল লিস্ট",
  },
  {
    icon: <MdPayment />,
    path: "/dashboard/recharge",
    element: "রিচার্জ",
  },
  {
    icon: <FaWhatsapp />,
    path: "https://chat.whatsapp.com/D78poyq7tHeDsjznJ1mxvg",
    element: "হোয়াইটস অ্যাাপ",
  },
];

export const adminNavData = [
  {
    icon: <FaHome />,
    path: "/dashboard/home",
    element: "Home",
  },
  {
    icon: <FaCodePullRequest />,
    path: "/dashboard/requests",
    element: "Requests",
  },
  {
    icon: <FaCcMastercard />,
    path: "/dashboard/payment-requests",
    element: "Payment Requests",
  },
  {
    icon: <FaCcMastercard />,
    path: "/dashboard/add-payments",
    element: "add payments manually",
  },
  {
    icon: <FaCcMastercard />,
    path: "/dashboard/update-charge",
    element: "update current charge",
  },
];
