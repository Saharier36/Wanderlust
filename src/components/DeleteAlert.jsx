"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export function DeleteAlert({ destination }) {
  const { _id, destinationName } = destination;
  const router = useRouter();

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(`http://localhost:5000/destinations/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
    });

    if (res.ok) {
      router.push("/destinations");
    } else {
      console.error("Failed to delete destination");
    }
  };

  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button
          variant="outline"
          size="sm"
          className="text-danger border-danger hover:bg-red-50 rounded-none"
        >
          <TrashBin className="w-3.5 h-3.5" />
          <span className="hidden md:block">Delete</span>
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100 rounded-none">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete destination permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" className="rounded-none">
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="danger"
                className="rounded-none"
              >
                Delete Destination
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
