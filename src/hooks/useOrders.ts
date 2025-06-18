
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, getOrders, createOrder, updateOrderStatus } from '@/services/orderService';
import { toast } from '@/hooks/use-toast';

export const useOrders = (userId?: string) => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => getOrders(userId),
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Created",
        description: `Order ${newOrder.id} has been submitted successfully`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error Creating Order",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order['status'] }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Updated",
        description: "Order status has been updated",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Updating Order",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    createOrder: createOrderMutation.mutate,
    isCreating: createOrderMutation.isPending,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    refetch: ordersQuery.refetch,
  };
};
