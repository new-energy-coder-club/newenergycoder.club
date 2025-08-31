import React, { useState } from 'react';
import MonitoringDashboard from '@/components/MonitoringDashboard';
import ErrorLogManager from '@/components/ErrorLogManager';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Shield, Activity, Bug } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Button>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  管理员控制台
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              New Energy Coder Club - 网站监控
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              性能监控
            </TabsTrigger>
            <TabsTrigger value="errors" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              错误监控
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <MonitoringDashboard />
          </TabsContent>
          
          <TabsContent value="errors">
            <ErrorLogManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;