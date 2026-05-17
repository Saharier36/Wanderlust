'use client'
import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import React from "react";
import toast from "react-hot-toast";

const BookingCancel = ({ bookingId }) => {
  const handleCancel = async () => {
    const {data: tokenData} = await authClient.token()
    const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      },
    });
    const data = await res.json();
    window.location.reload();
    if (res.ok) {
      toast.success("Booking cancelled successfully");
    }
  };
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          variant="bordered"
          size="sm"
          className="border-red-500 border text-red-500 rounded-none"
        >
          <TrashBin width={14} height={14} />
          Cancel
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100 rounded-none">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Cancel booking permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel your booking. This action cannot be
                undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className="rounded-none">
                Close
              </Button>
              <Button
                onClick={handleCancel}
                slot="close"
                variant="danger"
                className="rounded-none"
              >
                Cancel
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingCancel;
